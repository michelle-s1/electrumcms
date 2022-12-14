module.exports = ({ env }) => ({
    graphql: {
        config: {
            endpoint: '/graphql',
            shadowCRUD: true,
            playgroundAlways: true,
            depthLimit: 10,
            amountLimit: 100,
            apolloServer: {
              tracing: false,
              introspection: true,
            },
        },
    },
      'entity-notes': {
          enabled: true,
      },
      'import-export-entries': {
          enabled: true,
      },
      'upload': {
          config: {
            provider: 'aws-s3',
            providerOptions: {
              accessKeyId: env('AWS_ACCESS_KEY_ID'),
              secretAccessKey: env('AWS_SECRET_ACCESS_TOKEN'),
              region: env('AWS_REGION'),
              params: {
                Bucket: env('AWS_BUCKET'),
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