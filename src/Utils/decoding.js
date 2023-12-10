
function decodeHTMLEntities(text) {
    return text.replace(/&quot;/g, '"')
               .replace(/&#039;/g, "'")
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&amp;/g, '&');
  }


export default decodeHTMLEntities;