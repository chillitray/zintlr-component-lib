/*
 * HTMLContent component renders HTML content safely.
 * It uses dangerouslySetInnerHTML to inject HTML into the component.
 * This is useful for rendering content that includes HTML tags, such as formatted text or links.
 * The className prop allows for custom styling of the rendered content.
 */
const HTMLContent = ({ html, className = '' }) => {
  return <p className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};
export { HTMLContent };
