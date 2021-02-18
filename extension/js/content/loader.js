browser.runtime.onMessage.addListener((message) => {
    return loadBookData();
});
