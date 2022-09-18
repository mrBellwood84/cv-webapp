import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../../Core/Store/hooks"
import { SectionHeader } from "../_Shared/SectionHeader"
import { CreateEditUserForm } from "./CreateEditUserForm"

export const EditUserContainer = () => {

    const { t } = useTranslation();
    const selectedUser = useAppSelector((state) => state.admin.selectedUser);

    return (
        <Fragment>
            <SectionHeader text={selectedUser ? t("editUser") : t("createUser")} />
            <CreateEditUserForm />
        </Fragment>
    )
}