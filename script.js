// 1. Initialize Lenis for Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Custom Cursor Logic
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 3. GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Text Reveal
gsap.from(".reveal-text", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power4.out"
});

// Image Fade In
gsap.from(".hero-img-container", {
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    delay: 0.5,
    ease: "power2.out"
});

// 4. WhatsApp Order Function (Updated with your number)
function whatsappOrder(productName, price) {
    const phoneNumber = "917385585398"; // तुझा नंबर
    
    const message = `*Order Request - NISARGAM*\n\nHi, I would like to purchase:\nProduct: *${productName}*\nPrice: ₹${price}\n\nPlease confirm availability and payment details.`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
