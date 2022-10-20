import {
    customBackground,
    editContainer,
} from "./CreateWorkExperience.module.scss";

import CoverImage from "../../components/CoverImage";
import FeatherIcon from "feather-icons-react";

export default function CreateWorkExperiencePage() 
{
    return (
        <div className={`${customBackground}`}>
            <CoverImage></CoverImage>
            <div className="container mx-auto">
                <div className={`${editContainer}`}>
                    <a href="/Dashboard">
                        <div className="flex items-center">
                            <FeatherIcon
                                icon="chevron-left"
                                stroke="#BBCDE5"
                            ></FeatherIcon>
                            <label className="is-lightblue cursor-pointer">
                                Back
                            </label>
                        </div>
                    </a>
                    <h1 className="font-bold mb-10">Add a work experience</h1>
                    <div className="grid grid-cols-2 mb-6">
                        <div>
                            <div className="mb-2">
                                <label>Company Name</label>
                            </div>
                            <input type="text" placeholder="ABC Inc." />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <div className="mb-2">
                                <label>Start Date</label>
                            </div>
                            <input type="text" placeholder="Jan, 2022" />
                        </div>
                        <div>
                            <div className="mb-2">
                                <label>End Date</label>
                            </div>
                            <input type="text" placeholder="Dec, 2022" />
                        </div>
                    </div>
                    <div className="grid grid-cols-10 gap-4 mb-6">
                        <div className="col-span-5">
                            <div className="mb-2">
                                <label>Address</label>
                            </div>
                            <input type="text" placeholder="123 Street St" />
                        </div>
                        <div className="col-span-1">
                            <div className="mb-2">
                                <label>Province</label>
                            </div>
                            <input type="text" placeholder="ON" />
                        </div>
                        <div className="col-span-2">
                            <div className="mb-2">
                                <label>City</label>
                            </div>
                            <input type="text" placeholder="Welland" />
                        </div>
                        <div className="col-span-2">
                            <div className="mb-2">
                                <label>Country</label>
                            </div>
                            <input type="text" placeholder="Canada" />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="mb-2">
                            <label>Description</label>
                        </div>
                        <textarea
                            name=""
                            id=""
                            cols={30}
                            rows={10}
                            placeholder="Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore
                            et dolore magna aliqua. Tortor vitae
                            purus faucibus ornare suspendisse
                            sed nisi lacus sed. Sed egestas
                            egestas fringilla phasellus faucibus
                            scelerisque eleifend donec. Morbi
                            tempus iaculis urna id volutpat
                            lacus. Mattis molestie a iaculis at
                            erat pellentesque adipiscing commodo
                            elit. Imperdiet nulla malesuada
                            pellentesque elit. Volutpat blandit
                            aliquam etiam erat velit. Mollis
                            aliquam ut porttitor leo. Lacus
                            laoreet non curabitur gravida arcu
                            ac tortor dignissim convallis.
                            Cursus in hac habitasse platea
                            dictumst quisque. Vitae turpis massa
                            sed elementum tempus. Risus
                            ultricies tristique nulla aliquet
                            enim tortor. Neque aliquam
                            vestibulum morbi blandit cursus
                            risus at ultrices. Eget felis eget
                            nunc lobortis mattis aliquam
                            faucibus purus in. Turpis nunc eget
                            lorem dolor sed viverra ipsum nunc
                            aliquet."
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-4">
                        <button className="button">Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
