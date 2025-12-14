import { yupResolver } from '@hookform/resolvers/yup'
import { Col, Row, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import ReactQuill from 'react-quill'
import * as yup from 'yup'
import TextFormInput from '@/components/form/TextFormInput'
import 'react-quill/dist/quill.snow.css'
import { useGlobalContext } from '@/context/useGlobalContext'

const generalFormSchema = yup.object({
  name: yup.string().required('Service name is required'),
  descQuill: yup.string().required('Service description is required'),
})

const normalizeQuillValue = (value) => {
  if (!value || value === '<p><br></p>' || value === '<br/>') return ''
  return value
}

const GeneralDetailsForm = () => {
  const { createService } = useGlobalContext()
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(generalFormSchema),
    defaultValues: {
      name: '',
      descQuill: '',
    },
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true)

      await createService({
        name: data.name,
        description: data.descQuill,
      })

      alert('Service created successfully!')

      reset({
        name: '',
        descQuill: '',
      })
    } catch (error) {
      alert(error?.response?.data?.message || 'Failed to create service')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col lg={6}>
          <TextFormInput
            control={control}
            label="Service Name"
            placeholder="Enter service name"
            containerClassName="mb-3"
            id="service-name"
            name="name"
            error={errors.name?.message}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <div className="mb-5">
            <label className="form-label">Service Description</label>
            <Controller
              name="descQuill"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  value={normalizeQuillValue(field.value)}
                  onChange={(content) => field.onChange(normalizeQuillValue(content))}
                  style={{ height: 195 }}
                  className="pb-sm-3 pb-5 pb-xl-0"
                  modules={{
                    toolbar: [
                      [{ font: [] }, { size: [] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ color: [] }, { background: [] }],
                      [{ script: 'super' }, { script: 'sub' }],
                      [{ header: [false, 1, 2, 3, 4, 5, 6] }, 'blockquote', 'code-block'],
                      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                      [{ direction: 'rtl' }, { align: [] }],
                      ['link', 'image', 'video'],
                      ['clean'],
                    ],
                  }}
                />
              )}
            />
            {errors.descQuill && <p className="text-danger mt-1">{errors.descQuill.message}</p>}
          </div>
        </Col>
      </Row>

      <Button type="submit" disabled={loading} className="mt-4">
        {loading ? 'Creating...' : 'Create Service'}
      </Button>
    </form>
  )
}
export default GeneralDetailsForm
