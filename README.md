# cognito

Create file aws-exports.js in root folder, adding the codes below:

const awsmobile = {
    'aws_app_analytics': 'enable',
    'aws_cognito_identity_pool_id': 'us-east-2:168c1ff1-8701-4653-9e22-4f1eea2b6571',
    'aws_cognito_region': 'us-east-2',
    'aws_content_delivery': 'enable',
    'aws_content_delivery_bucket': 'cognitodemo-hosting-mobilehub-690103611',
    'aws_content_delivery_bucket_region': 'us-east-2',
    'aws_content_delivery_cloudfront': 'enable',
    'aws_content_delivery_cloudfront_domain': 'dyesmnlphduzv.cloudfront.net',
    'aws_mobile_analytics_app_id': '289fd5a9e63a4992b231c1e072d191bd',
    'aws_mobile_analytics_app_region': 'us-east-1',
    'aws_project_id': '2c02a3ee-9bb1-48ef-8fd8-0dc0e6f7b62f',
    'aws_project_name': 'cognito_demo',
    'aws_project_region': 'us-east-2',
    'aws_resource_name_prefix': 'cognitodemo-mobilehub-690103611',
    'aws_sign_in_enabled': 'enable',
    'aws_user_pools': 'enable',
    'aws_user_pools_id': 'us-east-2_02cMsEi6w',
    'aws_user_pools_mfa_type': 'ON',
    'aws_user_pools_web_client_id': 'go9ldcof90p3q0ssfbsbqg4ka',
}

export default awsmobile;
