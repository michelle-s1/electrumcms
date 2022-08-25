module.exports = ({ env }) => ({
	'entity-notes': {
		enabled: true,
	},
    'import-export-entries': {
        enabled: true,
    },
    upload: {
        config: {
          provider: 'aws-s3',
          providerOptions: {
            accessKeyId: env('ACCESS_KEY_ID'),
            secretAccessKey: env('SECRET_ACCESS_TOKEN'),
            region: 'us-east-2',
            params: {
              Bucket: 'electrumstrapi',
            },
          },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        },
      },
});