async function getIPv4Address() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('IPアドレスを取得できませんでした',error);
        null;
    }
}

async function getIPv6Address() {
    try {
        const response = await fetch('https://api6.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('IPアドレスを取得できませんでした', error);
        null;
    }
}

async function displayIPAddresses() {
    const ipv4Address = await getIPv4Address();
    const ipv6Address = await getIPv6Address();
    const ipv4Element = document.getElementById('ipv4');
    const ipv6Element = document.getElementById('ipv6');
    if (ipv4Address) {
        ipv4Element.textContent = ipv4Address;
        ipv4Element.addEventListener('click', () => {
            copyToClipboard('ipv4');
        });
    } else {
        ipv4Element.textContent = 'IPアドレスを取得できませんでした';
    }
    if (ipv6Address) {
        ipv6Element.textContent = ipv6Address;
        ipv6Element.addEventListener('click', () => {
            copyToClipboard('ipv6');
        });
    } else {
        ipv6Element.textContent = 'IPアドレスを取得できませんでした';
    }
}

async function copyToClipboard(id) {
    const element = document.getElementById(id);
    await navigator.clipboard.writeText(element.textContent);
    await notify('IPアドレスをコピーしました');
}

async function notify(message) {
    const notifyContainer = document.getElementById('notify-container');
    const notifyContent = document.getElementById('notify');
    notifyContainer.style.display = 'block';
    notifyContent.textContent = message;
    notifyContainer.style.opacity = 1;
    await new Promise(resolve => setTimeout(resolve, 3000));
    notifyContainer.style.opacity = 0;
    await new Promise(resolve => setTimeout(resolve, 500));
    notifyContainer.style.display = 'none';
}

window.onload = displayIPAddresses;