'use client'

import { User, Mail, Phone, Camera, Save, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useFormWithServerAction } from '@/hooks/use-form-with-server-action'
import { profileSchema } from '@/lib/schema/profile'
import { updateProfile } from '@/components/features/profile/actions/profile-actions'
import { useToast } from '@/hooks/use-toast-notifications'
import { Profile } from '@/types/profile'
import { useEffect } from 'react'

interface ProfilePageClientProps {
  profile: Profile
}

export const ProfilePageClient = ({ profile }: ProfilePageClientProps) => {
  const { error, success } = useToast()

  const { form, handleSubmit, isPending, canSubmit } = useFormWithServerAction({
    schema: profileSchema,
    action: updateProfile,
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
    },
    onSuccess: () => {
      success('Update profile successfully')
    },
    onError: (errors) => {
      if (errors.root) {
        error(errors.root)
      }
    },
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        full_name: profile.full_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
      })
    }
  }, [profile, form])

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Hồ sơ cá nhân</h1>

      {/* Avatar */}
      <div className="mb-8 flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-20 w-20 text-2xl">
            <AvatarFallback>
              {(profile.full_name || 'U').charAt(0)}
            </AvatarFallback>
          </Avatar>
          <button className="bg-primary hover:bg-primary/90 absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full text-white transition">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            {profile.full_name || 'Chưa cập nhật'}
          </h2>
          <p className="text-muted-foreground text-sm">{profile.email}</p>
        </div>
      </div>

      <form className="space-y-5">
        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            <User className="h-4 w-4" /> Họ và tên
          </Label>
          <Input value={''} />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            <Mail className="h-4 w-4" /> Email
          </Label>
          <Input value={''} disabled className="bg-muted" />
          <p className="text-muted-foreground text-xs">
            Email không thể thay đổi
          </p>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            <Phone className="h-4 w-4" /> Số điện thoại
          </Label>
          <Input value={''} />
        </div>

        <Button type="submit" className="gap-2">
          {false ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Đang lưu...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Lưu thay đổi
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
