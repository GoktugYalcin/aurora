'use client';

import React from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export const AuthenticationStage: React.FC<{ key?: string }> = () => {
  const { data: session } = useSession();
  return !session ? (
    <span
      onClick={() => signIn('spotify', { callbackUrl: '/suggest' })}
      className="flex justify-center items-center gap-3 text-black px-6 py-4 text-lg bg-white hover:bg-slate-50 transition-colors rounded-full shadow cursor-pointer"
    >
      <Image src={'/spotify.svg'} alt="spotify" width={20} height={20} />
      <span>Login with Spotify</span>
    </span>
  ) : (
    <>
      <div className="flex justify-center items-center pb-2 text-md">
        <span className="mr-3">Logged as:</span>{' '}
        <Image
          src={session.user?.image}
          alt={session.user?.name}
          width={30}
          height={30}
          className="rounded-full mr-1"
        />
        <span className="font-semibold">{session.user?.name}</span>
      </div>
      <div className="flex justify-center items-center gap-3">
        <Link
          href={'/suggest'}
          className="flex justify-center items-center gap-3 text-black px-6 py-4 text-lg bg-white hover:bg-slate-50 transition-colors rounded-full shadow cursor-pointer"
        >
          <span>Go To Generate</span>
        </Link>
        <span
          onClick={() => signOut()}
          className="flex flex-col justify-center items-center gap-1 text-black px-6 py-4 text-lg bg-white hover:bg-slate-50 transition-colors rounded-full shadow cursor-pointer"
        >
          <span>Log Out</span>
        </span>
      </div>
    </>
  );
};
