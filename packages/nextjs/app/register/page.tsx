"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
import userIcon from "../../public/userIcon.svg";
// import { writeContract } from "@wagmi/core";
import type { NextPage } from "next";
// import { erc20Abi } from "viem";
import MemberEntranceButton from "~~/components/3F/MemberEntranceButton";
import { UsdtInput } from "~~/components/3F/UsdtInput";
import { AddressInput } from "~~/components/scaffold-eth";

// import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
// import { wagmiConfig } from "~~/services/web3/wagmiConfig";

// const tokenUsdt = process.env.NEXT_PUBLIC_TEST_TOKEN_ADDRESS_FUSDT ?? "0x";
const contractMember = process.env.NEXT_PUBLIC_FIRST_CONTRACT_MEMBER || "0x";

const Register: NextPage = () => {
  // const { address: connectedAddress } = useAccount();
  const [address, setAddress] = useState("");
  const [deposit, setDeposit] = useState("");
  const [hasUpline, setHasUpline] = useState(false);
  // const router = useRouter();

  // const { data: contract } = useDeployedContractInfo("FFFBusiness");
  // const { writeContractAsync: memberEntrance } = useScaffoldWriteContract("FFFBusiness");

  // const handleMemberEntrance = async () => {
  //   try {
  //     console.log(contractMember);
  //     if (address === "") setAddress(contractMember);

  //     if (!contract?.address) {
  //       console.error("Direccion del contrato no encontrada");
  //       return;
  //     }

  //     const contractAddress = contract?.address ?? "0x";
  //     const convertDeposit = Math.round(Number(deposit) * 10 ** 6);
  //     const allowanceAmount = BigInt(convertDeposit);

  //     // Allowance for transaction
  //     const approveTx = await writeContract(wagmiConfig, {
  //       abi: erc20Abi,
  //       address: tokenUsdt,
  //       functionName: "approve",
  //       args: [contractAddress, allowanceAmount],
  //     });

  //     if (approveTx) {
  //       await memberEntrance({
  //         functionName: "memberEntrance",
  //         args: [address, allowanceAmount],
  //       });
  //     }

  //     router.push("/dashboard");
  //   } catch (e) {
  //     console.error("Error", e);
  //   }
  // };

  useEffect(() => {
    if (!hasUpline) setAddress(contractMember);
  }, [hasUpline]);

  return (
    <>
      <div className="flex items-center justify-center flex-col flex-grow pt-10">
        <article>
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
              <Image src={userIcon} alt="user icon" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center pt-1  px-8">
              <h2 className="card-title m-0">Bienvenido!!</h2>
              <p className="mt-2 mb-1 leading-none font-light">Bienvenido a la comunidad descentralizada</p>
              <div className="card-actions flex-col w-full">
                <div className="w-full">
                  {!hasUpline && (
                    <span>
                      <p className="text-xs font-thin text-slate-400 flex self-start ml-3 mb-2">
                        Eres referido de alguien?
                      </p>
                      <AddressInput
                        onChange={setAddress}
                        value={address}
                        placeholder="Pon la dirección de tu Upline"
                        disabled={hasUpline}
                      />
                    </span>
                  )}
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="text-xs font-thin text-slate-400 m-0 ml-3">No tengo un upline</span>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-xs"
                        onChange={() => setHasUpline(!hasUpline)}
                      />
                    </label>
                  </div>

                  <div className="flex-grow pt-4">
                    <UsdtInput value={deposit} onChange={amount => setDeposit(amount)} />
                    <p className="mb-2 text-xs font-light text-slate-600">Deposito minimo de 2000 USDT</p>
                  </div>
                </div>
                <MemberEntranceButton uplineAddress={address} depositAmount={deposit} btnText="Entrar" />
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default Register;
