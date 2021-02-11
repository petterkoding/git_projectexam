function displayError(type = "success", message = "Error has occured while calling the API") {
    const html = `<div class="error-message ${type}">${message}</div>`;
    return html;
}
