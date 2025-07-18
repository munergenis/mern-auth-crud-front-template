import { Loader } from '@/shadcn/components/Loader/Loader';
import { Button } from '@/shadcn/components/ui/button';
import { verifyEmail } from '@/features/user/verifyEmail/actions/verifyEmail';
import { AppMessage } from '@/shared/components/AppMessage';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { useRouterParams } from '@/shared/hooks/useRouterParams';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { ALLOW_REGISTER } from '@/config/consts/configConsts';

export const VerifyEmail = () => {
  const { code } = useRouterParams('code');

  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ['emailVerification', code],
    queryFn: () => verifyEmail(code),
  });

  return (
    <div className="w-full max-w-sm mx-auto my-auto flex flex-col gap-y-8">
      {isPending && <Loader />}
      {isSuccess && <AppMessage title="Email verified!" />}
      {isError && (
        <ErrorMessage
          title="Invalid link"
          description="The link is either invalid or expired."
          linkLabel={ALLOW_REGISTER ? 'Register again' : undefined}
          linkPath={ALLOW_REGISTER ? '/register' : undefined}
        />
      )}

      {(isError || isSuccess) && (
        <Button asChild>
          <Link
            to="/"
            replace
          >
            Back Home
          </Link>
        </Button>
      )}
    </div>
  );
};
