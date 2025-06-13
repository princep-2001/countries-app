import { Form } from 'react-bootstrap';

const CommonInput = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  isInvalid,
  error,
}) => {
  return (
    <Form.Group className="form-group">
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={isInvalid}
        size="lg"
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default CommonInput;
