interface BaseParameterDefinition {
    readonly name: string
    readonly type: string
    readonly live?: boolean
}

interface CaptionParameterDefinition {
    readonly caption: string
}

interface InitialParameterDefinition<T> {
    readonly initial: T
}

interface PlaceholderParameterDefinition {
    readonly placeholder: string
}

export interface GroupParameterDefinition extends BaseParameterDefinition, CaptionParameterDefinition {
    readonly type: 'group'
    readonly initial?: 'closed'
}

export interface TextParameterDefinition extends BaseParameterDefinition, CaptionParameterDefinition, InitialParameterDefinition<string>, PlaceholderParameterDefinition {
    readonly type: 'text'

    readonly size: number;
    readonly maxLength: number;
}

export interface NumberBasedParameterDefinition extends BaseParameterDefinition, CaptionParameterDefinition, InitialParameterDefinition<number> {
    readonly type: 'int' | 'number'

    readonly min: number
    readonly max: number
    readonly step: number
}

export interface SliderParameterDefinition extends BaseParameterDefinition, CaptionParameterDefinition, InitialParameterDefinition<number> {
    readonly type: 'slider'

    readonly min: number
    readonly max: number
    readonly step: number

    //Used for animations
    readonly fps?: number
    readonly autostart?: true
    readonly loop?: 'restart'
}

export interface DateParameterDefinition extends BaseParameterDefinition, CaptionParameterDefinition, InitialParameterDefinition<`${number}-${number}-${number}`>, PlaceholderParameterDefinition {
    readonly type: 'date'

    readonly min: `${number}-${number}-${number}`
    readonly max: `${number}-${number}-${number}`
}

export interface CheckboxParameterDefinition extends BaseParameterDefinition, CaptionParameterDefinition {
    readonly type: 'checkbox'
    readonly checked: boolean
}

type MultiChoiceParameterDefinition = {
    readonly values: readonly [number, ...number[]]
    readonly captions: readonly [string, ...string[]]
    readonly initial: number
} | {
    readonly values: readonly [string, ...string[]]
    readonly initial: string
}

export type ChoiceParameterDefinition = BaseParameterDefinition & CaptionParameterDefinition & MultiChoiceParameterDefinition & {
    readonly type: 'choice'
}

export type RadioButtonParameterDefinition = BaseParameterDefinition & CaptionParameterDefinition & MultiChoiceParameterDefinition & {
    readonly type: 'radio'
}

export interface EMailParameterDefinition extends BaseParameterDefinition, CaptionParameterDefinition, InitialParameterDefinition<string> {
    readonly type: 'email'
}

export interface UrlParameterDefinition extends BaseParameterDefinition, CaptionParameterDefinition, InitialParameterDefinition<string>, PlaceholderParameterDefinition {
    readonly type: 'url'
    readonly size: number,
    readonly maxLength: number
}

export interface ColorParameterDefinition extends BaseParameterDefinition, CaptionParameterDefinition, InitialParameterDefinition<string> {
    readonly type: 'color'
}

export interface PasswordParameterDefinition extends BaseParameterDefinition, CaptionParameterDefinition, InitialParameterDefinition<string> {
    readonly type: 'password'
}

export type ParameterDefinition = GroupParameterDefinition | TextParameterDefinition | NumberBasedParameterDefinition | SliderParameterDefinition | DateParameterDefinition | CheckboxParameterDefinition | ChoiceParameterDefinition | RadioButtonParameterDefinition | EMailParameterDefinition | UrlParameterDefinition | ColorParameterDefinition | PasswordParameterDefinition

/*
const exampleParameters: Array<ParameterDefinition> = [
    { name: 'group1', type: 'group', caption: 'Group 1: Text Entry' },
    { name: 'text', type: 'text', initial: '', size: 20, maxLength: 20, caption: 'Plain Text:', placeholder: '20 characters' },
    { name: 'int', type: 'int', initial: 20, min: 1, max: 100, step: 1, caption: 'Integer:' },
    { name: 'number', type: 'number', initial: 2.0, min: 1.0, max: 10.0, step: 0.1, caption: 'Number:' },
    { name: 'date', type: 'date', initial: '2020-01-01', min: '2020-01-01', max: '2030-12-31', caption: 'Date:', placeholder: 'YYYY-MM-DD' },
    { name: 'email', type: 'email', initial: 'me@example.com', caption: 'Email:' },
    { name: 'url', type: 'url', initial: 'www.example.com', size: 40, maxLength: 40, caption: 'Url:', placeholder: '40 characters' },
    { name: 'password', type: 'password', initial: '', caption: 'Password:' },

    { name: 'group2', type: 'group', caption: 'Group 2: Interactive Controls' },
    { name: 'checkbox', type: 'checkbox', checked: true, caption: 'Checkbox:' },
    { name: 'color', type: 'color', initial: '#FFB431', caption: 'Color:' },
    { name: 'slider', type: 'slider', initial: 3, min: 1, max: 10, step: 1, caption: 'Slider:' },
    { name: 'choice1', type: 'choice', caption: 'Dropdown Menu:', values: [0, 1, 2, 3], captions: ['No', 'Yes', 'Maybe', 'So so'], initial: 2 },
    { name: 'choice3', type: 'choice', caption: 'Dropdown Menu:', values: ['No', 'Yes', 'Maybe', 'So so'], initial: 'No' },
    { name: 'choice2', type: 'radio', caption: 'Radio Buttons:', values: [1, 5], captions: ["Yes", "No"], initial: 5 },

    { name: 'group3', type: 'group', initial: 'closed', caption: 'Group 3: Initially Closed Group' },
    { name: 'checkbox2', type: 'checkbox', checked: true, caption: 'Optional Checkbox:' },


    //Animated
    { name: "t", type: "slider", initial: 0, caption: "t", min: 0, max: 60, step: 1, fps: 1, live: true, autostart: true, loop: 'restart' }
]
*/