import * as React from "react";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import { AUcheckbox } from '@gov.au/control-input';

export interface ICheckboxFieldProps {
    label: string;
    id: string;
}

class Checkbox extends React.Component<ICheckboxFieldProps> {
    render() {
        return (
            <React.Fragment>
               {/* <AUcheckbox label="Phone" name="checkbox-ex" id="cb-phone"/>
               <AUcheckbox label="Tablet" name="checkbox-ex" id="cb-tablet" defaultChecked /> */}
            </React.Fragment>
        )
    }
}

export default Checkbox;