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

### autoscaling
- **describe groups**: 
  - autoscaling:DescribeAutoScalingInstances
  - autoscaling:DescribeAutoScalingGroups
- **update groups**: 
  - autoscaling:SetDesiredCapacity
  - autoscaling:UpdateAutoScalingGroup
  - autoscaling:TerminateInstanceInAutoScalingGroup

### cloudformation
- **describe stack**: stack, region
  - cloudformation:DescribeStacks
  - cloudformation:DescribeStackResources

### cloudwatch
- **write metrics**: 
  - cloudwatch:PutMetricData

### dynamodb
- **read from**: table, region
  - dynamodb:GetItem
  - dynamodb:Query
  - dynamodb:Scan
  - dynamodb:BatchGetItem
- **write to**: table, region
  - dynamodb:PutItem
  - dynamodb:DeleteItem
  - dynamodb:BatchWriteItem
- **manage table**: table, region
  - dynamodb:CreateTable
  - dynamodb:DeleteTable
  - dynamodb:DescribeTable
  - dynamodb:UpdateTable
  - dynamodb:ListTables
- **read from stream**: table, region
  - dynamodb:GetRecords
  - dynamodb:GetShardIterator
  - dynamodb:DescribeStream
  - dynamodb:ListStreams

### s3
- **list objects**: bucket, prefix
  - s3:ListBucket
- **read from**: bucket, prefix
  - s3:GetObject
  - s3:GetObjectAcl
  - s3:GetObjectVersions
- **write to**: bucket, prefix
  - s3:PutObject
  - s3:PutObjectAcl
  - s3:DeleteObject
- **manage multipart uploads**: bucket
  - s3:ListBucketMultipartUploads
  - s3:ListMultipartUploadParts
  - s3:AbortMultipartUpload
- **bucket info**: 
  - s3:ListAllMyBuckets
  - s3:GetBucketLocation
- **manage lifecycle**: bucket
  - s3:GetLifecycleConfiguration
  - s3:PutLifecycleConfiguration
- **manage notifications**: bucket
  - s3:GetBucketNotification
  - s3:PutBucketNotification
- **remove versions**: bucket, prefix
  - s3:DeleteObjectVersion

### sns
- **publish to**: topic
  - sns:Publish
- **publish from bucket**: topic, bucket
  - sns:Publish
