function PasswordChangeForm({
  form,
  onChange,
  onSubmit,
  message,
  error,
  saving,
}) {
  return (
    <section className="mt-8 border-t border-slate-200 pt-6" aria-labelledby="change-password-heading">
      <h3 id="change-password-heading" className="text-xl font-bold text-slate-900">
        Change Password
      </h3>
      <p className="mt-1 text-sm text-slate-600">
        Enter and re-enter your new password.
      </p>

      <form onSubmit={onSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-slate-700">
          New password
          <input
            type="password"
            name="new_password"
            value={form.new_password}
            onChange={onChange}
            autoComplete="new-password"
            required
            className="rounded-lg border p-3 text-slate-900"
          />
        </label>
        <label className="grid gap-1 text-sm font-medium text-slate-700">
          Re-enter new password
          <input
            type="password"
            name="confirm_password"
            value={form.confirm_password}
            onChange={onChange}
            autoComplete="new-password"
            required
            className="rounded-lg border p-3 text-slate-900"
          />
        </label>
        <div className="md:col-span-2">
          {error && <p className="mb-3 text-sm font-medium text-red-700" role="alert">{error}</p>}
          {message && <p className="mb-3 text-sm font-medium text-emerald-700" role="status">{message}</p>}
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-wait disabled:opacity-60"
          >
            {saving ? "Updating password..." : "Update Password"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default PasswordChangeForm;
