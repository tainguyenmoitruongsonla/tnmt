import DatePickerComponent from 'src/@core/components/field/date-field'
import TextFieldComponent from 'src/@core/components/field/text-field'
import AutoCompleteComponent from 'src/@core/components/field/auto-complete'

export const DatePicker = (props: any) => <DatePickerComponent {...props} />;

export const TextField = (props: any) => <TextFieldComponent {...props} />;

export const AutoComplete = ({ customInputLabelProps, label, renderInput, ...props }: any) => <AutoCompleteComponent {...props} customInputLabelProps={customInputLabelProps} label={label} renderInput={renderInput} />;
