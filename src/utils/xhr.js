function xhr(method, url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) resolve(xhr.responseText);
        }
        xhr.onerror = () => reject("Connection Error");
        xhr.send(data);
    })
}

export default xhr;