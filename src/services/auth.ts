import { getSupabase } from "./supabase";
import { UserProfile, LoginCredentials, RegisterCredentials, AppError } from "@/types";

/**
 * Authentication Service
 * Handles all authentication operations with Supabase Auth
 */

/**
 * Register a new user with email and password
 * @throws AppError on failure
 */
export const registerUser = async (
  credentials: RegisterCredentials
): Promise<{ user: UserProfile; session: string }> => {
  try {
    const { email, password, fullName } = credentials;

    // Validate inputs
    if (!email || !password || !fullName) {
      throw new AppError(
        "VALIDATION_ERROR",
        "جميع الحقول مطلوبة",
        400
      );
    }

    // Validate password strength
    if (password.length < 8) {
      throw new AppError(
        "WEAK_PASSWORD",
        "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
        400
      );
    }

    const supabase = getSupabase();

    // Sign up with email and password
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          language: "ar",
        },
      },
    });

    if (error) {
      throw new AppError(
        "SIGNUP_ERROR",
        getErrorMessage(error.code),
        400
      );
    }

    if (!data.user) {
      throw new AppError(
        "SIGNUP_ERROR",
        "فشل إنشاء الحساب",
        400
      );
    }

    // Create user profile
    const profile = await createUserProfile(
      data.user.id,
      fullName,
      email
    );

    return {
      user: profile,
      session: data.session?.access_token || "",
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      "SIGNUP_ERROR",
      "حدث خطأ أثناء إنشاء الحساب",
      500
    );
  }
};

/**
 * Login user with email and password
 * @throws AppError on failure
 */
export const loginUser = async (
  credentials: LoginCredentials
): Promise<{ user: UserProfile; session: string }> => {
  try {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new AppError(
        "VALIDATION_ERROR",
        "البريد الإلكتروني وكلمة المرور مطلوبة",
        400
      );
    }

    const supabase = getSupabase();

    // Sign in with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new AppError(
        "LOGIN_ERROR",
        getErrorMessage(error.code),
        401
      );
    }

    if (!data.user) {
      throw new AppError(
        "LOGIN_ERROR",
        "فشل تسجيل الدخول",
        401
      );
    }

    // Get user profile
    const profile = await getUserProfile(data.user.id);

    return {
      user: profile,
      session: data.session?.access_token || "",
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      "LOGIN_ERROR",
      "حدث خطأ أثناء تسجيل الدخول",
      500
    );
  }
};

/**
 * Logout current user
 * @throws AppError on failure
 */
export const logoutUser = async (): Promise<void> => {
  try {
    const supabase = getSupabase();

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new AppError(
        "LOGOUT_ERROR",
        "فشل تسجيل الخروج",
        500
      );
    }
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      "LOGOUT_ERROR",
      "حدث خطأ أثناء تسجيل الخروج",
      500
    );
  }
};

/**
 * Send password reset email
 * @throws AppError on failure
 */
export const resetPassword = async (email: string): Promise<void> => {
  try {
    if (!email) {
      throw new AppError(
        "VALIDATION_ERROR",
        "البريد الإلكتروني مطلوب",
        400
      );
    }

    const supabase = getSupabase();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "wain://reset-password",
    });

    if (error) {
      throw new AppError(
        "RESET_ERROR",
        "فشل إرسال رابط إعادة تعيين كلمة المرور",
        500
      );
    }
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      "RESET_ERROR",
      "حدث خطأ أثناء إعادة تعيين كلمة المرور",
      500
    );
  }
};

/**
 * Get current session
 */
export const getCurrentSession = async () => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return data.session;
  } catch (error) {
    return null;
  }
};

/**
 * Get current user
 */
export const getCurrentUser = async (): Promise<UserProfile | null> => {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      return null;
    }

    return getUserProfile(data.user.id);
  } catch (error) {
    return null;
  }
};

/**
 * Create user profile in database
 */
const createUserProfile = async (
  userId: string,
  fullName: string,
  email: string
): Promise<UserProfile> => {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("profiles")
      .insert([
        {
          id: userId,
          email,
          full_name: fullName,
          language: "ar",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      throw new AppError(
        "PROFILE_ERROR",
        "فشل إنشاء الملف الشخصي",
        500
      );
    }

    return data as UserProfile;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      "PROFILE_ERROR",
      "حدث خطأ أثناء إنشاء الملف الشخصي",
      500
    );
  }
};

/**
 * Get user profile from database
 */
const getUserProfile = async (userId: string): Promise<UserProfile> => {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw new AppError(
        "PROFILE_ERROR",
        "فشل جلب الملف الشخصي",
        404
      );
    }

    return data as UserProfile;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      "PROFILE_ERROR",
      "حدث خطأ أثناء جلب الملف الشخصي",
      500
    );
  }
};

/**
 * Map Supabase error codes to Arabic messages
 */
const getErrorMessage = (errorCode: string | undefined): string => {
  const errorMap: Record<string, string> = {
    "invalid_credentials": "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    "user_already_exists": "هذا البريد الإلكتروني مسجل بالفعل",
    "email_not_confirmed": "يرجى تأكيد بريدك الإلكتروني",
    "weak_password": "كلمة المرور ضعيفة جداً",
    "over_email_send_rate_limit": "لقد أرسلنا لك رابط مؤخراً، حاول لاحقاً",
    "invalid_grant": "انتهت صلاحية رابط إعادة تعيين كلمة المرور",
  };

  return errorMap[errorCode || ""] || "حدث خطأ في المصادقة";
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  getCurrentSession,
  getCurrentUser,
};
