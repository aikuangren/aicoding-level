import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Pressable,
} from 'react-native';
import { BaseButton, BaseCard } from '@/components';
import { COLORS, TYPOGRAPHY, SPACING, GAME_CONFIG, ANIMATION_DURATION } from '@/utils/constants';
import { Question, QuizAnswer } from '@/types';

// 模拟题目数据
const mockQuestions: Question[] = [
  {
    id: '1',
    type: 'listening_image',
    knowledgePointId: '1',
    question: '听音选图：请选择正确的图片',
    options: ['🐶', '🐱', '🐰', '🐸'],
    correctAnswer: '🐶',
    audio: 'dog.mp3',
  },
  {
    id: '2',
    type: 'reading_image',
    knowledgePointId: '2',
    question: '看图选词：这是什么动物？',
    options: ['Dog', 'Cat', 'Rabbit', 'Frog'],
    correctAnswer: 'Dog',
    image: '🐶',
  },
  {
    id: '3',
    type: 'word_spelling',
    knowledgePointId: '3',
    question: '单词拼写：请拼写"苹果"的英文单词',
    correctAnswer: 'apple',
    hints: ['A开头', '5个字母'],
  },
];

export const QuizScreen: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<QuizAnswer[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.questionTimeLimit);
  const [score, setScore] = useState(0);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const feedbackAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<NodeJS.Timeout>();

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === mockQuestions.length - 1;

  useEffect(() => {
    // 启动计时器
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1000) {
          handleTimeUp();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestionIndex]);

  useEffect(() => {
    // 页面切换动画
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: ANIMATION_DURATION.normal,
      useNativeDriver: true,
    }).start();

    return () => {
      slideAnim.setValue(0);
    };
  }, [currentQuestionIndex, slideAnim]);

  const handleTimeUp = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    handleSubmitAnswer(''); // 空答案表示超时
  };

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    
    // 延迟提交答案，让用户看到选择效果
    setTimeout(() => {
      handleSubmitAnswer(answer);
    }, 200);
  };

  const handleSubmitAnswer = (answer: string) => {
    const startTime = Date.now() - (GAME_CONFIG.questionTimeLimit - timeLeft);
    const correct = answer === currentQuestion.correctAnswer;
    
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      userAnswer: answer,
      isCorrect: correct,
      timeSpent: startTime,
      attempts: 1,
      hintsUsed: 0,
    };

    setUserAnswers(prev => [...prev, newAnswer]);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(prev => prev + 1);
    }

    // 显示反馈动画
    Animated.timing(feedbackAnim, {
      toValue: 1,
      duration: ANIMATION_DURATION.normal,
      useNativeDriver: true,
    }).start();

    // 自动跳到下一题
    setTimeout(() => {
      if (isLastQuestion) {
        handleQuizComplete();
      } else {
        handleNextQuestion();
      }
    }, GAME_CONFIG.autoNextDelay);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer('');
    setTimeLeft(GAME_CONFIG.questionTimeLimit);
    feedbackAnim.setValue(0);
    slideAnim.setValue(0);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleQuizComplete = () => {
    // 导航到结果页面
    console.log('Quiz completed with score:', score);
    console.log('User answers:', userAnswers);
  };

  const handlePause = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    // 显示暂停菜单
    console.log('Pause quiz');
  };

  const renderQuestionContent = () => {
    switch (currentQuestion.type) {
      case 'listening_image':
        return (
          <View style={styles.questionContent}>
            <BaseButton
              title="🔊 播放音频"
              onPress={() => console.log('Play audio:', currentQuestion.audio)}
              style={styles.audioButton}
            />
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </View>
        );
        
      case 'reading_image':
        return (
          <View style={styles.questionContent}>
            <Text style={styles.imageText}>{currentQuestion.image}</Text>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </View>
        );
        
      case 'word_spelling':
        return (
          <View style={styles.questionContent}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            {currentQuestion.hints && (
              <View style={styles.hintsContainer}>
                {currentQuestion.hints.map((hint, index) => (
                  <Text key={index} style={styles.hintText}>💡 {hint}</Text>
                ))}
              </View>
            )}
          </View>
        );
        
      default:
        return null;
    }
  };

  const renderAnswerOptions = () => {
    if (currentQuestion.type === 'word_spelling') {
      // 拼写题使用输入框 (简化为按钮选择)
      const options = ['apple', 'appl', 'aple', 'appel'];
      return (
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <BaseButton
              key={option}
              title={option}
              type={selectedAnswer === option ? 'primary' : 'secondary'}
              onPress={() => handleAnswerSelect(option)}
              style={styles.optionButton}
              disabled={showFeedback}
            />
          ))}
        </View>
      );
    }

    return (
      <View style={styles.optionsContainer}>
        {currentQuestion.options?.map((option) => (
          <Pressable
            key={option}
            style={[
              styles.optionCard,
              selectedAnswer === option && styles.selectedOption,
              showFeedback && option === currentQuestion.correctAnswer && styles.correctOption,
              showFeedback && selectedAnswer === option && !isCorrect && styles.wrongOption,
            ]}
            onPress={() => handleAnswerSelect(option)}
            disabled={showFeedback}
          >
            <Text style={styles.optionText}>{option}</Text>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      {/* 顶部状态栏 */}
      <View style={styles.header}>
        <BaseButton
          title="⏸️"
          size="small"
          type="secondary"
          onPress={handlePause}
          style={styles.pauseButton}
        />
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1}/{mockQuestions.length}
          </Text>
          <View style={styles.progressDots}>
            {mockQuestions.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index < currentQuestionIndex && styles.completedDot,
                  index === currentQuestionIndex && styles.currentDot,
                ]}
              />
            ))}
          </View>
        </View>
        
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{Math.ceil(timeLeft / 1000)}s</Text>
        </View>
      </View>

      {/* 题目区域 */}
      <Animated.View
        style={[
          styles.questionContainer,
          {
            transform: [{
              translateX: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 0],
              }),
            }],
            opacity: slideAnim,
          },
        ]}
      >
        <BaseCard style={styles.questionCard}>
          {renderQuestionContent()}
        </BaseCard>
      </Animated.View>

      {/* 答案选择区域 */}
      <View style={styles.answerContainer}>
        {renderAnswerOptions()}
      </View>

      {/* 反馈效果 */}
      {showFeedback && (
        <Animated.View
          style={[
            styles.feedbackOverlay,
            {
              opacity: feedbackAnim,
              transform: [{
                scale: feedbackAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              }],
            },
          ]}
        >
          <View style={[
            styles.feedbackContainer,
            isCorrect ? styles.correctFeedback : styles.wrongFeedback,
          ]}>
            <Text style={styles.feedbackIcon}>
              {isCorrect ? '✅' : '❌'}
            </Text>
            <Text style={styles.feedbackText}>
              {isCorrect ? '太棒了！' : '再试一次！'}
            </Text>
            {!isCorrect && (
              <Text style={styles.correctAnswerText}>
                正确答案：{currentQuestion.correctAnswer}
              </Text>
            )}
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  
  pauseButton: {
    width: 40,
    height: 40,
  },
  
  progressContainer: {
    flex: 1,
    alignItems: 'center',
  },
  
  progressText: {
    ...TYPOGRAPHY.bodyBold,
    color: '#FFFFFF',
    marginBottom: SPACING.xs,
  },
  
  progressDots: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  
  completedDot: {
    backgroundColor: COLORS.success,
  },
  
  currentDot: {
    backgroundColor: COLORS.primary,
    transform: [{ scale: 1.2 }],
  },
  
  timerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
  },
  
  timerText: {
    ...TYPOGRAPHY.bodyBold,
    color: '#FFFFFF',
  },
  
  questionContainer: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },
  
  questionCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  questionContent: {
    alignItems: 'center',
    width: '100%',
  },
  
  audioButton: {
    marginBottom: SPACING.lg,
  },
  
  imageText: {
    fontSize: 80,
    marginBottom: SPACING.lg,
  },
  
  questionText: {
    ...TYPOGRAPHY.title3,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  
  hintsContainer: {
    marginTop: SPACING.md,
  },
  
  hintText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  
  answerContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    justifyContent: 'center',
  },
  
  optionCard: {
    width: '45%',
    minHeight: 60,
    backgroundColor: COLORS.background.primary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
  },
  
  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: '#E3F2FD',
  },
  
  correctOption: {
    borderColor: COLORS.success,
    backgroundColor: '#E8F5E8',
  },
  
  wrongOption: {
    borderColor: COLORS.error,
    backgroundColor: '#FFEBEE',
  },
  
  optionText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.primary,
    textAlign: 'center',
    fontSize: 20,
  },
  
  optionButton: {
    width: '45%',
    marginBottom: SPACING.sm,
  },
  
  feedbackOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  feedbackContainer: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 20,
    padding: SPACING.xl,
    alignItems: 'center',
    maxWidth: '80%',
  },
  
  correctFeedback: {
    borderColor: COLORS.success,
    borderWidth: 3,
  },
  
  wrongFeedback: {
    borderColor: COLORS.error,
    borderWidth: 3,
  },
  
  feedbackIcon: {
    fontSize: 60,
    marginBottom: SPACING.md,
  },
  
  feedbackText: {
    ...TYPOGRAPHY.title2,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  
  correctAnswerText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});