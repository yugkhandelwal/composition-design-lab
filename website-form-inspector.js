// Website Form Inspector
// Copy and paste this into the browser console on https://composition-design-lab.vercel.app/

console.log("🔍 Website Form Inspector Starting...");

// Find the contact form
const contactForm = document.querySelector('#contact form');
if (!contactForm) {
    console.error("❌ Contact form not found!");
} else {
    console.log("✅ Contact form found:", contactForm);
}

// Find form fields
const nameField = document.querySelector('input[name="name"]');
const emailField = document.querySelector('input[name="email"]');
const subjectField = document.querySelector('input[name="subject"]');
const messageField = document.querySelector('textarea[name="message"]');
const submitButton = document.querySelector('button[type="submit"]');

console.log("📝 Form fields:", {
    name: nameField,
    email: emailField,
    subject: subjectField,
    message: messageField,
    submit: submitButton
});

// Test form submission manually
window.testWebsiteForm = async function() {
    console.log("🧪 Testing website form...");
    
    // Fill in test data
    if (nameField) nameField.value = "Website Test User";
    if (emailField) emailField.value = "websitetest@example.com";
    if (subjectField) subjectField.value = "Website Form Test";
    if (messageField) messageField.value = "This is a test from the actual website form via console.";
    
    console.log("📝 Form filled with test data");
    
    // Trigger form submission
    if (contactForm) {
        console.log("📤 Submitting form...");
        const event = new Event('submit', { bubbles: true, cancelable: true });
        contactForm.dispatchEvent(event);
    }
};

// Listen for form submission events
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        console.log("🚀 Form submission intercepted:", e);
        console.log("📋 Form data:", new FormData(this));
    });
}

// Check if there are any JavaScript errors
window.addEventListener('error', function(e) {
    console.error("💥 JavaScript error detected:", e.error);
});

console.log("✅ Form inspector loaded. Run testWebsiteForm() to test the actual form.");
console.log("📍 Navigate to the contact section and try submitting the form normally to see debug info.");
