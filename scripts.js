 // Load saved journal entries from localStorage when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
    loadEntries();
});

// Save a new journal entry
function saveEntry() {
    const entryText = document.getElementById('entryText').value;
    const entryImage = document.getElementById('entryImage').files[0];

    // Ensure that either text or an image is provided
    if (!entryText && !entryImage) {
        alert('Please enter some text or upload an image.');
        return;
    }

    // Handle the image file upload if provided
    let reader = new FileReader();
    reader.onload = function(e) {
        // Retrieve existing entries from localStorage
        let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        // Create a new entry object with text and image data
        let entry = {
            text: entryText,
            image: e.target.result
        };
        // Add the new entry to the list and save back to localStorage
        entries.push(entry);
        localStorage.setItem('journalEntries', JSON.stringify(entries));
        // Display the new entry in the UI
        displayEntry(entry);
        // Clear the text area and file input for the next entry
        document.getElementById('entryText').value = '';
        document.getElementById('entryImage').value = '';
    };

    // If an image is uploaded, convert it to a base64 string
    if (entryImage) {
        reader.readAsDataURL(entryImage);
    } else {
        // If no image, just proceed with saving the text entry
        reader.onload({ target: { result: null } });
    }
}

// Display a single journal entry on the page
function displayEntry(entry) {
    const entriesDiv = document.getElementById('entries');
    const entryDiv = document.createElement('div');
    entryDiv.className = 'entry';

    // Add the entry text
    const entryText = document.createElement('p');
    entryText.textContent = entry.text;
    entryDiv.appendChild(entryText);

    // If there's an image, display it
    if (entry.image) {
        const entryImage = document.createElement('img');
        entryImage.src = entry.image;
        entryDiv.appendChild(entryImage);
    }

    // Append the entry div to the entries container
    entriesDiv.appendChild(entryDiv);
}

// Load all saved journal entries from localStorage and display them
function loadEntries() {
    let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    entries.forEach(displayEntry);
}
 