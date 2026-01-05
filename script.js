// साधे WhatsApp ऑर्डर फंक्शन
function buyNow(productName) {
    // तुमचा WhatsApp नंबर इथे टाका (उदा. 91xxxxxxxxxx)
    const phoneNumber = "917385585398"; 
    
    // मेसेज तयार करणे
    const message = `Hello Nisargam, I want to buy your ${productName}. Please confirm the order.`;
    
    // WhatsApp लिंक ओपन करणे
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// (Optional) Smooth Scroll Effect साठी तुम्ही 'Lenis' किंवा 'Locomotive Scroll' वापरू शकता
// सध्या साध्या CSS scroll-behavior ने काम होईल.
document.documentElement.style.scrollBehavior = "smooth";
