import {
  IsEmail,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {

  @IsEmail(
    {},
    {
      message:
        'Invalid email format',
    },
  )
  email: string;

  @MinLength(8, {
    message:
      'Password must be at least 8 characters',
  })

  @Matches(
    /(?=.*[A-Z])/,
    {
      message:
        'Password must contain one uppercase letter',
    },
  )

  @Matches(
    /(?=.*[0-9])/,
    {
      message:
        'Password must contain one number',
    },
  )

  @Matches(
    /(?=.*[!@#$%^&*])/,
    {
      message:
        'Password must contain one special character',
    },
  )

  password: string;
}