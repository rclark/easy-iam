# permissions

An outline of the functions provided by this library and the permissions that they expose

You can call a function as follows:

```js
var iam = require('easy-iam');
iam.dynamodb['read from']({ table: 'my-table', region: 'us-east-1' });
```

You can also provide objects if you are working in a CloudFormation template:

```js
iam.dynamodb['read from']({ table: { Ref: 'MyTable' }, region: { Ref: 'AWS::Region' } });
```

## Available permissions

### autoscaling
- **describe groups**: 
  - DescribeAutoScalingInstances
  - DescribeAutoScalingGroups
- **update groups**: 
  - SetDesiredCapacity
  - UpdateAutoScalingGroup
  - TerminateInstanceInAutoScalingGroup

### cloudformation
- **describe stack**: stack, region
  - DescribeStacks
  - DescribeStackResources

### cloudwatch
- **write metrics**: 
  - PutMetricData

### dynamodb
- **read from**: table, region
  - GetItem
  - Query
  - Scan
  - BatchGetItem
- **write to**: table, region
  - PutItem
  - UpdateItem
  - DeleteItem
  - BatchWriteItem
- **manage table**: table, region
  - CreateTable
  - DeleteTable
  - DescribeTable
  - UpdateTable
  - ListTables
- **read from stream**: table, region
  - GetRecords
  - GetShardIterator
  - DescribeStream
  - ListStreams

### s3
- **list objects**: bucket, prefix
  - ListBucket
- **read from**: bucket, prefix
  - GetObject
  - GetObjectAcl
  - GetObjectVersions
- **write to**: bucket, prefix
  - PutObject
  - PutObjectAcl
  - DeleteObject
- **manage multipart uploads**: bucket
  - ListBucketMultipartUploads
  - ListMultipartUploadParts
  - AbortMultipartUpload
- **bucket info**: 
  - ListAllMyBuckets
  - GetBucketLocation
- **manage lifecycle**: bucket
  - GetLifecycleConfiguration
  - PutLifecycleConfiguration
- **manage notifications**: bucket
  - GetBucketNotification
  - PutBucketNotification
- **remove versions**: bucket, prefix
  - DeleteObjectVersion

### sns
- **publish to**: topic
  - Publish
- **publish from bucket**: topic, bucket
  - Publish
