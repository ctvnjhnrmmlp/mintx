'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MINTX from '@/constants/mintx';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { writeContract: approve } = useWriteContract();
  const { writeContract: mint } = useWriteContract();

  const { data: allowance } = useReadContract({
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    abi: MINTX.FUNGIBLE_ABI,
    functionName: 'allowance',
    args: [address, MINTX.NON_FUNGIBLE_ADDRESS],
  });

  const handleMint = async () => {
    if (!allowance) {
      approve({
        address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        abi: MINTX.FUNGIBLE_ABI,
        functionName: 'approve',
        args: [MINTX.NON_FUNGIBLE_ADDRESS, 500],
      });
    }

    mint({
      address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
      abi: MINTX.NON_FUNGIBLE_ABI,
      functionName: 'mint',
    });
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <section>
        <div className='w-full max-w-5xl items-center justify-between text-sm lg:flex'>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>MintX</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <ConnectButton />
                {isConnected && (
                  <button
                    onClick={handleMint}
                    className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
                  >
                    Mint NFT
                  </button>
                )}
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
