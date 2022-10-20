import {
    customBackground,
    editContainer,
    customNavbar,
    workExperienceContainer,
    addWorkExperienceContainer
} from "./Dashboard.module.scss";
import FeatherIcon from "feather-icons-react";
import CoverImage from "../../components/CoverImage";

export default function DashboardPage() 
{
    return (
        <div className={`${customBackground}`}>
            <CoverImage></CoverImage>
            <div className="container mx-auto px-4 lg:px-0">
                <div className="grid grid-cols-1 lg:gap-10 lg:grid-cols-4">
                    <div className={`${customNavbar} justify-center mb-10`}>
                        <h1 className="font-bold text-center">
                            Tapped
                            <span style={{ color: "#639FAB" }}>In.</span>
                        </h1>
                    </div>
                    <div className="flex flex-col col-span-3">
                        <h1 className="mb-3 font-bold">Edit</h1>
                        <div className={`${editContainer}`}>
                            {/* TODO: Insert Content Here */}

                            <div>
                                <div className="mb-3">
                                    <label>Work</label>
                                </div>
                                <div className="mb-3">
                                    <div
                                        className={`${workExperienceContainer}`}
                                    >
                                        <div className="mb-6">
                                            <label>
                                                Software Engineer @ ABC Inc.
                                            </label>
                                            <p>
                                                123 Street St, ON Welland Canada
                                            </p>
                                            <p>Jan, 2022 - Oct, 2022</p>
                                        </div>
                                        <div className="mb-3">
                                            <label>Description</label>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet,
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
                                            aliquet.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`${addWorkExperienceContainer} 
                                flex items-center justify-center`}
                                >
                                    <a href="/CreateWorkExperience">
                                        <div className="cursor-pointer">
                                            <FeatherIcon
                                                icon="plus"
                                                size="54"
                                                stroke-width="1"
                                                color="#BBCDE5"
                                            />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
