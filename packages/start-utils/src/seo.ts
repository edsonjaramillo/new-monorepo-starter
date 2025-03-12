type SEOProps = {
  title?: string;
  description?: string;
  ogType?: 'website' | 'article' | 'product' | 'profile';
  image?: {
    url: string;
    width: number;
    height: number;
  };
};

type SEOTags = React.ComponentProps<'meta'>;

export function seo({ title, description, image, ogType }: SEOProps): SEOTags[] {
  const tags: SEOTags[] = [];

  if (title) {
    tags.push({ title }, { name: 'og:title', content: title });
  }

  if (description) {
    tags.push(
      { name: 'description', content: description },
      { name: 'og:description', content: description },
    );
  }

  if (ogType) {
    tags.push({ name: 'og:type', content: ogType });
  }

  if (image) {
    tags.push(
      { name: 'og:image', content: image.url },
      { name: 'og:image:width', content: image.width.toString() },
      { name: 'og:image:height', content: image.height.toString() },
    );
  }

  return tags;
}
