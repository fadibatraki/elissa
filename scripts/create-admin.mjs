// scripts/create-admin.mjs
// Creates an admin user by calling the app's signup API
// This ensures proper password hashing by better-auth
//
// Run with: node scripts/create-admin.mjs
// 
// Environment variables:
//   APP_URL - The URL of the running app (default: http://localhost:3000)
//   ADMIN_EMAIL - Admin email (default: admin@example.com)
//   ADMIN_PASSWORD - Admin password (required)
//   ADMIN_NAME - Admin name (default: Admin User)

const APP_URL = process.env.APP_URL || "http://app:3000";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_NAME = process.env.ADMIN_NAME || "Admin User";

if (!ADMIN_PASSWORD) {
  console.error("ERROR: ADMIN_PASSWORD environment variable is required");
  console.log("\nUsage:");
  console.log("  ADMIN_PASSWORD='yourpass' node scripts/create-admin.mjs");
  console.log("\nOr with Docker:");
  console.log("  docker run --rm --network your_network \\");
  console.log("    -e APP_URL='http://app:3000' \\");
  console.log("    -e ADMIN_EMAIL='admin@example.com' \\");
  console.log("    -e ADMIN_PASSWORD='YourSecurePassword123!' \\");
  console.log("    prisma-migrate node /app/scripts/create-admin.mjs");
  process.exit(1);
}

async function createAdmin() {
  console.log("Creating admin user...");
  console.log("App URL:", APP_URL);
  console.log("Email:", ADMIN_EMAIL);
  console.log("Name:", ADMIN_NAME);

  try {
    // Call better-auth's signup endpoint
    const response = await fetch(`${APP_URL}/api/auth/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        name: ADMIN_NAME,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.message?.includes("already exists") || data.code === "USER_ALREADY_EXISTS") {
        console.log("⚠️  User already exists with this email");
        console.log("To update password, delete the user first or use the app's password reset");
        process.exit(0);
      }
      console.error("❌ Failed to create user:", data.message || data.error || JSON.stringify(data));
      process.exit(1);
    }

    console.log("✅ Admin user created successfully!");
    console.log("Email:", ADMIN_EMAIL);
    if (data.user?.id) {
      console.log("User ID:", data.user.id);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.cause?.code === "ECONNREFUSED") {
      console.log("\nMake sure the app is running and accessible at:", APP_URL);
      console.log("If running in Docker, use the container name (e.g., http://app:3000)");
    }
    process.exit(1);
  }
}

createAdmin();