export const config = {
  "dev": {
    "username": process.env.RDS_UDAGRAM_USERNAME,
    "password": process.env.RDS_UDAGRAM_PASSWORD,
    "database": process.env.RDS_UDAGRAM_DATABASE,
    "host": process.env.RDS_UDAGRAM_HOST,
    "dialect": process.env.DIALECT,
    "aws_region": process.env.AWS_UDAGRAM_REGION,
    "aws_profile": process.env.AWS_UDAGRAM_PROFILE,
    "aws_media_bucket": process.env.AWS_MEDIA_BUCKET
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
