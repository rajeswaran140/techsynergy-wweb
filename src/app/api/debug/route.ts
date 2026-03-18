import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    AWS_REGION: process.env.AWS_REGION,
    AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,
    MY_AWS_REGION: process.env.MY_AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ? 'SET' : 'NOT SET',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET',
    AWS_SESSION_TOKEN: process.env.AWS_SESSION_TOKEN ? 'SET' : 'NOT SET',
    AWS_EXECUTION_ENV: process.env.AWS_EXECUTION_ENV,
    AWS_LAMBDA_FUNCTION_NAME: process.env.AWS_LAMBDA_FUNCTION_NAME,
    LAMBDA_TASK_ROOT: process.env.LAMBDA_TASK_ROOT,
    _HANDLER: process.env._HANDLER,
  };

  return NextResponse.json({
    message: 'Debug information',
    environment: envVars,
    nodeVersion: process.version,
    platform: process.platform,
  });
}
