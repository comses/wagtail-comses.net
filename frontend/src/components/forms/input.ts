import { Component, Prop } from 'vue-property-decorator'
import BaseControl from './base'

@Component({
    template: `<div class="form-group">
        <slot name="label" :label="label">
            <label :for='controlId' class="form-control-label">{{ label }}</label>
        </slot>
        <input :id='controlId' :type="type" :name="name" :class="['form-control', {'is-invalid': isInvalid}]" :value="value"
                @input="updateValue($event.target.value)">
        <div class="invalid-feedback">
            {{ errorMessage }}
        </div>
        <slot name="help" :help="help">
            <small :aria-describedby='controlId' class="form-text text-muted">{{ help }}</small>
        </slot>
    </div>`
})
class Input extends BaseControl {
    @Prop({ default: ''})
    validate: string;

    @Prop({ default: 'text'})
    type: string;

    @Prop({default: ''})
    label: string;

    @Prop({ default: ''})
    help: string;

    toggle(value: string) {
        let v: boolean = false;
        if (value === 'true') {
            v = true
        }
        this.$emit('input', !v);
    }
}

export default Input;
