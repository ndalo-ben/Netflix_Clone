import connectToDB from "@/database";
import Account from "@/models/Account";
import { NextResponse } from "next/server";
import { hash } from 'bcryptjs'


export const dynamic = "force-dynamic"

export async function POST(req) {
    try {
        await connectToDB();

        const { name, pin, uid } = await req.json();

        const isAccountAlreadyExist = await Account.find({ uid, name })

        const allAccounts = await Account.find({})
        if (isAccountAlreadyExist && isAccountAlreadyExist.length > 0) {
            return NextResponse.json({
                success: false,
                message: "Please try with a different name"
            })
        }

        if (allAccounts && allAccounts.length === 4) {
            return NextResponse.json({
                success: false,
                message: "You can only have a max of 4 accounts"
            })
        }

        const hashPin = await hash(pin, 12)

        const newlyCreatedAccount = await Account.create({
            name, pin: hashPin, uid
        })

        if (newlyCreatedAccount) {
            return NextResponse.json({
                success: true,
                message: "Account created successfully"
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "Something Went Wrong"
            })
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something Went Wrong"
        });
    }
}