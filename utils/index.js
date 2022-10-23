export function redirectToBookPage({ slug }) {
  return {
    redirect: {
      destination: `/books/${slug}`,
      permanent: false,
    },
  };
}
