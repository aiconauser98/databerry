const getS3RootDomain = () => {
  if (process.env.NEXT_PUBLIC_AWS_ENDPOINT) {
    return `${process.env.NEXT_PUBLIC_AWS_ENDPOINT}`;
  }
  return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.eu-central-1.com`;
};

export default getS3RootDomain;
