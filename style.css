* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    background-color: #050505;
    color: white;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.landing-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.98);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    transition: opacity 0.5s ease;
}

.enter-text {
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: 4px;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    animation: pulseText 2s infinite !important;
}

.enter-text:hover {
    transform: scale(1.05);
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
}

.hidden {
    display: none !important;
}

.container {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem;
    max-width: 700px;
    width: 90%;
    background: rgba(5, 5, 5, 0.25);
    backdrop-filter: blur(12px);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    animation: fadeScale 0.5s ease-out;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
    perspective: 1000px;
}

.container:hover {
    background: rgba(5, 5, 5, 0.35);
    border-color: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
}

.profile-section {
    margin-bottom: 2rem;
    position: relative;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-section:hover {
    transform: scale(1.02);
}

.profile-img-wrapper {
    width: 130px;
    height: 130px;
    margin: 0 auto 1.5rem;
    position: relative;
    overflow: visible;
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.08);
    animation: pulse 3s infinite;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.profile-img:hover {
    transform: scale(1.1);
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
}

.caption-wrapper {
    position: relative;
    margin: 0 auto 2.5rem;
    max-width: 80%;
}

.caption {
    font-size: 1.4rem;
    font-weight: 500;
    opacity: 0.9;
    letter-spacing: 5px;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
    transform: scaleX(1.1);
    color: rgba(255, 255, 255, 0.85);
    position: relative;
    z-index: 2;
    text-transform: lowercase;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.caption:hover {
    letter-spacing: 6px;
    text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
}

.buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1.2rem;
    align-items: center;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInContainer 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: 0.2s;
    margin-top: 2rem;
    padding: 0.8rem;
    border-radius: 16px;
    background: rgba(0, 0, 0, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.buttons-container:hover {
    background: rgba(0, 0, 0, 0.25);
    transform: scale(1.02);
}

.btn {
    background: rgba(0, 0, 0, 0.4);
    color: rgba(255, 255, 255, 0.9);
    padding: 0.8rem 1.8rem;
    border-radius: 12px;
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.08);
    cursor: pointer;
    min-width: 140px;
    backdrop-filter: blur(8px);
    position: relative;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.5);
    border-color: rgba(255, 255, 255, 0.12);
    letter-spacing: 0.5px;
}

.telegram-btn {
    opacity: 0;
    animation: fadeInButton 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: 0.4s;
}

.discord-btn {
    opacity: 0;
    animation: fadeInButton 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: 0.6s;
}

.website-btn {
    opacity: 0;
    animation: fadeInButton 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: 0.8s;
}

.freeze-overlay {
    position: absolute;
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.15),
        rgba(255, 255, 255, 0.05)
    );
    pointer-events: none;
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 4px;
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.mouse-particles {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
}

.mouse-outline {
    pointer-events: none;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99;
}

.snow-landing, .snow {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.snowflake {
    position: absolute;
    background: white;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0.85;
    filter: blur(1px);
    transition: all 0.3s ease;
    will-change: transform;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
}

.snowflake.frozen {
    filter: blur(2px);
    opacity: 0.95;
    animation: none !important;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
}

.notification {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-100px);
    background: rgba(20, 20, 20, 0.95);
    color: white;
    padding: 1rem 2rem;
    border-radius: 12px;
    backdrop-filter: blur(5px);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    z-index: 2000;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 0.9rem;
    letter-spacing: 1px;
}

.notification.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}

@keyframes fadeInContainer {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInButton {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeScale {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes frost {
    0% {
        left: -100%;
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        left: 100%;
        opacity: 0;
    }
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
    }
    50% {
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.15);
    }
    100% {
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
    }
}

@keyframes pulseText {
    0% {
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        transform: scale(1);
    }
    50% {
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        transform: scale(1.05);
    }
    100% {
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        transform: scale(1);
    }
}
