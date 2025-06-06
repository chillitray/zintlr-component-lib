// For Linkedin URLs
export const refactor_ln_urls = (original_url) => {
  let url = original_url;
  //we need to get only username
  if (url.includes('linkedin.com/in/')) {
    //Get the linkedin user name, get only username
    const username = url
      .replace(/(https?:\/\/(www.|de.)?linkedin.com\/(mwlite\/|m\/)?in\/\/?)/g, '')
      .split('/')?.[0];
    //Create linkedin url using username
    url = 'https://linkedin.com/in/' + username;
  }
  //If linkedin company, we have to add this because sometimes
  //linkedin.com/company/username/about/ or /jobs or anything comes
  //we need to get only company slug
  if (url.includes('linkedin.com/company/')) {
    //Get the linkedin company name, get only username
    const username = url
      .replace(/(https?:\/\/(www.|de.)?linkedin.com\/(mwlite\/|m\/)?company\/\/?)/g, '')
      .split('/')?.[0];
    //Create linkedin url using username
    url = 'https://linkedin.com/company/' + username;
  }
  return url;
}
