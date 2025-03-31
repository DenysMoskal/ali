'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedCheck from '@/components/UI/AnimatedCheck';
import { motion } from 'framer-motion';

import userIcon from '@/assets/user-icon.svg';
import emailIcon from '@/assets/email-icon.svg';
import levelIcon from '@/assets/level-icon.svg';

export default function ThankYouContent() {
  const searchParams = useSearchParams();

  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const candidateLevel = searchParams.get('candidateLevel');

  const submissionItems = [
    { id: 'name', value: name, icon: userIcon, label: 'Name:' },
    { id: 'email', value: email, icon: emailIcon, label: 'Email:' },
    { id: 'level', value: candidateLevel, icon: levelIcon, label: 'Level:' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <>
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg w-full border border-gray-100"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <AnimatedCheck />
          <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
            Thank you for your submission!
          </h1>
        </motion.div>

        {(name || email || candidateLevel) && (
          <motion.div
            className="mb-8 bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200 shadow-sm"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2">
              Submission Information
            </h2>
            <ul className="space-y-4">
              {submissionItems.map(
                (item) =>
                  item.value && (
                    <li key={item.id} className="flex items-center flex-wrap ">
                      <span className="font-medium text-gray-700 min-w-32 flex items-center">
                        <Image
                          src={item.icon}
                          alt={item.label.replace(':', '')}
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        {item.label}
                      </span>
                      <span className="text-gray-900 font-medium">
                        {item.value}
                      </span>
                    </li>
                  )
              )}
            </ul>
          </motion.div>
        )}

        <motion.div className="text-center" variants={itemVariants}>
          <p className="mb-6 text-gray-600">
            We will review your application and contact you soon.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Back to Form
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
}
