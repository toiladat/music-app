tinymce.init({
  selector: 'textarea[textarea-mce]',
  plugins: 'lists link image table code wordcount',
  // call api  rồi be xư lý upload cloud rôi return link
  images_upload_url:'/admin/upload'
});