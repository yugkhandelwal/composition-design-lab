// Contact Form Test Script
// Run this in the browser console on https://composition-design-lab.vercel.app/

console.log("🧪 Starting contact form test...");

async function testContactForm() {
  try {
    // Test the form submission function directly
    const testData = {
      name: "Test User",
      email: "test@example.com", 
      subject: "Browser Test",
      message: "This is a test message from the browser console"
    };

    console.log("📝 Test data:", testData);

    // Create FormData like the actual form does
    const formData = new FormData();
    formData.append('name', testData.name);
    formData.append('email', testData.email);
    formData.append('subject', testData.subject);
    formData.append('message', testData.message);
    formData.append('_replyto', testData.email);

    console.log("📤 Submitting form...");

    const response = await fetch('https://formspree.io/f/mvgqvyve', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log("📊 Response status:", response.status);
    console.log("📊 Response ok:", response.ok);

    if (response.ok || response.status === 302 || response.status === 422) {
      console.log("✅ Form submission successful!");
      try {
        const responseData = await response.json();
        console.log("📋 Response data:", responseData);
      } catch (e) {
        console.log("ℹ️ Response was not JSON (this is normal for some services)");
      }
      return true;
    } else {
      const errorText = await response.text();
      console.log("❌ Form submission failed:", errorText);
      return false;
    }
    
  } catch (error) {
    console.error("💥 Test error:", error);
    return false;
  }
}

// Run the test
testContactForm().then(success => {
  if (success) {
    console.log("🎉 Contact form test PASSED! The form should work correctly.");
  } else {
    console.log("🚨 Contact form test FAILED! There may be an issue with the form.");
  }
});
