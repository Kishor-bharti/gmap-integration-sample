function sendLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
  
        fetch('http://localhost:3000/save-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.text())
        .then(msg => alert(msg))
        .catch(err => console.error('Error:', err));
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  