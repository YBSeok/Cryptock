'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const schema = z.object({
  password: z
    .string()
    .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' }),
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const envPassword = process.env.NEXT_PUBLIC_PASSWORD;
    if (data.password === envPassword) {
      router.push('/charts');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-950">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-w-[320px] flex-col gap-4 rounded-lg bg-white p-8 shadow-lg"
      >
        <label htmlFor="password" className="text-lg font-bold text-blue-900">
          비밀번호를 입력하세요.
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="rounded border border-blue-900 px-4 py-2 focus:ring-2 focus:ring-blue-800 focus:outline-none"
          placeholder="비밀번호"
          autoComplete="current-password"
        />
        {errors.password && (
          <span className="text-sm text-red-600">
            {errors.password.message}
          </span>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-900 py-2 font-semibold text-white transition hover:bg-blue-800"
        >
          확인
        </button>
      </form>
    </div>
  );
}
