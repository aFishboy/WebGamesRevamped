import React from "react";
import copyRightSign from "../assets/images/copyRightSign.svg";

type Props = {};

const Footer = (props: Props) => {
    return (
        <footer className="max-container">
            <div className="flex justify-between bg-black h-[200px] mt-24 max-sm:flex-col max-sm:items-center">
                <div className="flex flex-1 justify-center items-center text-white gap-2 font-montserrat cursor-pointer">
                    <img
                        src={copyRightSign}
                        alt="copyright sign"
                        width={20}
                        height={20}
                        className="rounded-full m-0"
                    />
                    <p>Copyright. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
