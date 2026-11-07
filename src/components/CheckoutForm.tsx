"use client";

import { ChangeEvent, SubmitEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { placeOrderRequest } from "@/lib/mockOrderApi";
import { ShippingInfo } from "@/types";

type FormErrors = Partial<Record<keyof ShippingInfo, string>>;

const fields: { name: keyof ShippingInfo; label: string; type: string }[] = [
  { name: "fullName", label: "Full name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "address", label: "Address", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "postalCode", label: "Postal code", type: "text" },
];

function validate(values: ShippingInfo): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) errors.fullName = "Full name is required";
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email";
  if (!/^\d{7,15}$/.test(values.phone.replace(/[\s-]/g, ""))) {
    errors.phone = "Enter a valid phone number";
  }
  if (!values.address.trim()) errors.address = "Address is required";
  if (!values.city.trim()) errors.city = "City is required";
  if (!values.postalCode.trim()) errors.postalCode = "Postal code is required";

  return errors;
}

export default function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const ownerId = useCartStore((state) => state.ownerId);
  const clearCart = useCartStore((state) => state.clearCart);
  const user = useAuthStore((state) => state.user);

  const [values, setValues] = useState<ShippingInfo>({
    fullName: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const order = await placeOrderRequest(ownerId, items, values);
      router.push(`/checkout/success?order=${order.id}`);
      clearCart();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (items.length === 0 && !submitting) {
    return (
      <div>
        <p className="text-lg">Your cart is empty.</p>
        <Link href="/" className="mt-4 inline-block underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <h2 className="text-xl font-semibold">Shipping details</h2>

        {fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={f.name} className="mb-1 block text-sm font-medium">
              {f.label}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              value={values[f.name]}
              onChange={handleChange}
              className={`w-full rounded-lg border p-2 ${
                errors[f.name] ? "border-red-500" : ""
              }`}
            />
            {errors[f.name] && (
              <p className="mt-1 text-sm text-red-500">{errors[f.name]}</p>
            )}
          </div>
        ))}

        {submitError && <p className="text-sm text-red-500">{submitError}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-black py-3 text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {submitting ? "Placing order..." : "Place order"}
        </button>
      </form>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Order summary</h2>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4 text-sm">
              <span className="line-clamp-1">
                {item.title} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t pt-4 text-right text-lg font-semibold">
          Total: ${total.toFixed(2)}
        </p>
      </section>
    </div>
  );
}