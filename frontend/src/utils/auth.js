// Utility to check if user is authenticated
export function isAuthenticated() {
  return !!localStorage.getItem("access");
}
