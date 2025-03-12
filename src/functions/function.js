function getReleaseYear(dateString) {
  return dateString.split('-')[0];
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function createRuntimeString(minutes) {
  const hours = Math.floor(minutes / 60);
  const min = minutes % 60;

  return `${hours}h ${min}m`;
}

export { getReleaseYear, formatDate, createRuntimeString };
