import Image from "next/image";
import { getInfoUser } from "./_data-access/get-info-user";
import { notFound } from "next/navigation";
import { Form } from "react-hook-form";
import { FormDonate } from "./_conponents/form";
import { CoverSection } from "./_conponents/cover-section";
import { AboutSection } from "./_conponents/about-section";

export default async function Apoia({params,}: {params: Promise<{ username: string }>}) {
  const { username } = await params;


  const user = await getInfoUser({ username });
  if (!user) {
    return notFound();
  }

  console.log(user);
  
  
  
  return (
    <div className=" min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
     <CoverSection 
      coverImage={user?.image ?? ''}
      profileImage={user?.image ?? ''}
      name={user?.name ?? 'Seu nome aqui'}
      color={user?.color ?? '#000000'}
     />


    <main className="container mx-auto max-w-6xl p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 -mt-8 md:-mt-16 relative z-10">
        <div className="order-2 lg:order-1">
          <AboutSection name={user?.name ?? ''} description={user?.bio ?? ''}/>
        </div>

        <div className="order-1 lg:order-2">
          <FormDonate 
          slug={user.username!} 
          creatorId={user.connectedStripeAccountId ?? ""}
          />
        </div>
      </div>
    </main>

    </div>
  )
}



